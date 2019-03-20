<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="@yield('meta_description', 'Prevention Box')">
        <meta name="author" content="@yield('meta_author', 'Mihai Daniel Eremia')">
        <title>Prevention Box | AWS-Samaritans</title>
    </head>
    <body>
        <div id="root"></div>
        <script>
        window.Laravel =
        <?php echo json_encode([
                       'csrfToken' => csrf_token(),
                   ]); ?>
        </script>
        <!--Start of Tawk.to Script-->
        <script type="text/javascript" defer>
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/5c1663d482491369ba9e50cb/default';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        </script>
        <!--End of Tawk.to Script-->
        <script src="{{ mix('/js/app.js') }}" defer></script>
        <script type="text/javascript" defer>
            var file = location.pathname.split( "/" ).pop();
            var link = document.createElement( "link" );
            link.href = "{{ asset('css/app.css') }}";
            link.type = "text/css";
            link.rel = "stylesheet";
            link.media = "screen,print";
            document.getElementsByTagName( "head" )[0].appendChild( link );
            </script>
    

</body>
</html>