import request from 'request';
import { SIDEBAR_BODY } from '../template/template.js';

export const show_index = (req, res) => {
    
    request('https://ghibliapi.herokuapp.com/films', (err, response, data) => {
        if (err) throw err;
        else {
            data = JSON.parse(data);
            
            const css = `
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
                    box-shadow: 5px 5px 10px #A9A9A9;
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
            `;

            let containers = 'rows: [';

            data.forEach((item) => {
                let description = item.description.substr(0, 200) + '...';
                containers += `
                {
                    autoheight: true,
                    borderless: true,
                    template: \`
                    <div class='container'>
                        <table class='table'>
                            <tr>
                                <td class='index_title'>${item.title}</td>
                                <td rowspan=3 class='buttons'>
                                    <input type='button' class='index_btn' value='★'><br>
                                    <input type='button' class='index_btn' value='.zip'>
                                </td>
                            </tr>
                            <tr>
                                <td class='index_info'>By ${item.director} in ${item.release_date}</td>
                            </tr>
                            <tr>
                                <td class='index_description'>${description}</td>
                            </tr>
                        </table>
                    </div>
                    \`
                },
                `;
            });
            
            containers += ']';

            const body = `
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
            const template = SIDEBAR_BODY(css, body, '');
            res.send(template);
        }
    });
}

export const show_tree = (req, res) => {
    const template = SIDEBAR_BODY();
    res.send(template);
}

export const show_chart = (req, res) => {
    const body = `
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
                    template: 'bar'
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
    const template = SIDEBAR_BODY('', body, '');
    res.send(template);
}

export const show_timeLine = (req, res) => {
    const template = SIDEBAR_BODY();
    res.send(template);
}

export const show_drop_file_upload = (req, res) => {
    const template = SIDEBAR_BODY();
    res.send(template);
}