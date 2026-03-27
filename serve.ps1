$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add('http://localhost:8080/')
$http.Start()
Write-Host 'Serving on http://localhost:8080'

while($http.IsListening) {
    $context = $http.GetContext()
    $path = $context.Request.Url.LocalPath
    if($path -eq '/') { $path = '/index.html' }
    
    $root = 'c:\Users\NIRVA\anitgravity sources\Deluge-Practice'
    $filePath = Join-Path $root $path.TrimStart('/').Replace('/','\')
    
    try {
        $content = [IO.File]::ReadAllBytes($filePath)
        $ext = [IO.Path]::GetExtension($filePath)
        $types = @{
            '.html'='text/html;charset=utf-8'
            '.css'='text/css;charset=utf-8'
            '.js'='application/javascript;charset=utf-8'
            '.json'='application/json'
            '.png'='image/png'
            '.jpg'='image/jpeg'
            '.svg'='image/svg+xml'
        }
        $context.Response.ContentType = if($types[$ext]){$types[$ext]}else{'application/octet-stream'}
        $context.Response.OutputStream.Write($content,0,$content.Length)
    } catch {
        $context.Response.StatusCode = 404
        $b = [Text.Encoding]::UTF8.GetBytes('Not Found')
        $context.Response.OutputStream.Write($b,0,$b.Length)
    }
    $context.Response.Close()
}
