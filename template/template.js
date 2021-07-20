export function SIDEBAR_BODY(body='', func='') {
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
        /* === whole site === */

        body {
          line-height: 25px;
        }
        
        .sidebar_menu {
          background-color: aliceblue;
        }
        
        /* === INDEX PART START === */
        
        .container {
          padding-top: 20px;
          text-align: center;
          /* table을 container 상자 중앙에 오도록 설정 */
        }
        .table {
          padding: 15px;
          border: 1px solid #475466;
          border-radius: 20px;
          width: 95%;
          display: inline-block; /* text-align 영향 받으려면 lnline이어야 함 */
          text-align: left; /* table 내 text는 왼쪽 정렬로 설정 */
        }
        .table:hover {
          box-shadow: 5px 5px 10px #a9a9a9;
        }
        .table .index_title {
          font-size: 1.5em;
          font-weight: 600;
        }
        .table td {
          padding: 5px;
        }
        .table .index_description {
          font-size: 1.1em;
        }
        .buttons {
          text-align: center;
          width: 130px;
        }
        .buttons .index_btn {
          font-size: 1.2em;
          font-weight: 600;
          border-radius: 20px;
          width: 80px;
          margin: 10px;
          padding: 7px;
        }
        .buttons .index_btn:hover {
          color: gray;
        }
        
        .index_research {
          font-size: 2em;
          font-weight: 600;
        }
        /* === INDEX PART END === */

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
                                { id: 'ftp_download', value: 'FTP download'},
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
            });
            ${func}
        </script>
    </body>
    
    </html> 
    `;
}

export function INDEX_BODY(containers='') {
    return `
    rows: [
        {
            cols: [
                {
                    template: 'Here are contaienrs',
                    borderless: true,
                    css: 'index_research'
                },
                {
                    align: 'right',
                    body: {
                        view: 'toolbar',
                        borderless: true,
                        css: 'webix_transparent webix_button',
                        elements: [
                            {view: 'button', label: 'btn1', autowidth: true},
                            {view: 'button', label: 'btn2', autowidth: true}
                        ]
                    }
                }
            ]
        },
        {
            ${containers}
        },
        {
            template: 'footer - Park Kyungmi',
            autoheight: true,
        }
    ]
    `;
}

export function CHART_BODY(myData='') {
    return `
    rows: [
        {   /* webix doc: https://docs.webix.com/api__link__ui.view_animate_config.html */
            view: 'tabbar', id: 'tabbar',
            selected: 'line_and_spline',
            multiview: true,
            options: [
               { value: 'Line and Spline', id: 'line_and_spline'},
               { value: 'Bar', id: 'bar'},
               { value: 'Pie', id: 'pie'},
               { value: 'Area and SplineArea', id: 'area_and_splineArea'},
               { value: 'Radar', id: 'radar'}
            ]
        },
        {
            animate: {
                type: 'slide',
                direction: 'top'
            },
            fitBiggest: true,
            cells: [
                {
                    id: 'line_and_spline',
                    template: 'line and spline'
                },
                {
                    id: 'bar',
                    view: 'chart',
                    type: 'bar',
                    value: '#accident#',
                    autoConfig: true,
                    data: ${myData},
                    alpha: 0.8,
                    radius: 0,
                    border: true,
                    xAxis: {template: "#year#"},
                    yAxis: {
                        start: 200000,
                        end: 230000,
                        step: 1000,
                    }
                },
                {
                    id: 'pie',
                    template: 'pie'
                },
                {
                    id: 'area_and_splineArea',
                    template: 'area and splineArea'
                },
                {
                    id: 'radar',
                    template: 'radar'
                }
            ]
        }
    ]
    `;
}