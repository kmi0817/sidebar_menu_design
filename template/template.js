export function SIDEBAR_BODY(css='', body='', func='') {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TEST</title>
        <link rel="stylesheet" href="http://cdn.webix.com/edge/webix.css" type="text/css" />
        <link rel="stylesheet" href="//cdn.webix.com/materialdesignicons/5.8.95/css/materialdesignicons.min.css"
            type="text/css" charset="utf-8">
        <link rel="stylesheet" href="//cdn.webix.com/materialdesignicons/5.8.95/css/materialdesignicons.min.css"
            type="text/css" charset="utf-8">
        <script src="//cdn.webix.com/edge/webix.js" type="text/javascript"></script>
    
        <style>
            body {
                line-height: 25px;
            }
    
            .sidebar_menu {
                background-color: aliceblue;
            }

            ${css}
        </style>
    </head>
    
    <body>
        <script type="text/javascript" charset="utf-8">
            webix.ready(function () {
                webix.ui({
                    cols: [
                        {   /* === sidebar menu start === */

                            /* webix sidemenu doc: https://docs.webix.com/desktop__sidemenu.html */
                            view: 'sidebar',
                            id: 'sidebar_menu',
                            width: 200,
                            css: 'sidebar_menu',
                            data: [
                                {
                                    id: 'index',
                                    type: 'icon',
                                    icon: 'mdi mdi-home',
                                    value: 'home',
                                    selected: true
                                },
                                { id: 'tree', value: 'Tree' },
                                {
                                    id: 'chart', value: 'Chart',
                                    /* 서브 메뉴 사용X */
                                    // data: [
                                    //     { id: 'line_and_spline', value: 'Line and Spline' },
                                    //     { id: 'bar', value: 'bar' },
                                    //     { id: 'pie', value: 'Pie' },
                                    //     { id: 'area_and_splineArea', value: 'Area and SplineArea' },
                                    //     { id: 'radar', value: 'Radar' }
                                    // ]
                                },
                                { id: 'timeLine', value: 'TimeLine' },
                                { id: 'drop_file_upload', value: 'drop file upload' },
                            ]
    
                            /* === sidebar menu end === */
                        },
                        {   /* === col2 start === */
                            view: 'scrollview',
                            scroll: 'y',
                            body: {
                                ${body}
                            }
                            /* === col2 end === */
                        }
                    ]
                });
    
                $$('sidebar_menu').attachEvent('onAfterSelect', function (id) {
                    if (id === 'index') {
                        location.href='/';
                    } else {
                        location.href = '/' + id;
                    }
                });

                ${func}
            });
        </script>
    </body>
    
    </html> 
    `;
}