import request from 'request';
import fs from 'fs';
import Client from 'ssh2-sftp-client';

const config = {

};

import { SIDEBAR_BODY,
    INDEX_BODY,
    CHART_BODY,
} from '../template/template.js';

export const sftp_download = (req, res) => {
    const sftp = new Client;
    sftp.connect(config).then(() => {
        const fromServer = '';
        const toLocal = '';

        return sftp.get(fromServer, toLocal);
    }).then(() => {
        sftp.end();
    }).catch((err) =>{
        console.error(err.message);
    });

    res.redirect('/');
}

export const show_index = (req, res) => {
    
    request('https://ghibliapi.herokuapp.com/films', (err, response, data) => {
        if (err) throw err;
        else {
            data = JSON.parse(data);

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
                                    <input type='button' class='index_btn' value='.zip' onclick='javascript:location.href="/sftp_download"'>
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

            const body = INDEX_BODY(containers);
            const template = SIDEBAR_BODY(body, '');
            res.send(template);
        }
    });
}

export const show_ftp_download = (req, res) => {
    const body = `
    template: \`
    <h2>FTP download XX</h2>
    <ul>
        <li>자바스크립트는 FTP를 지원하지 않는다.</li>
        <li>클라이언트 사이드에서 FTP 작업하려면 아마도 Flash나 자바 애플렛이 필요할 것이다.</li>
        <li>따라서 서버 사이드 혹은 더 robust한 클라이언트 사이드 언어를 사용하여 remote server에 접근해야 한다.</li>
        <li>Node JS에서 FTP에 접근하려면, 직접 FTP 내용을 모두 설정해야 한다. (참고2)</li>
    </ul>
    <ol>
        <li>참고1: <a href='https://stackoverflow.com/questions/4594798/download-file-from-ftp-via-javascript'>Download file from FTP via Javascript</a></li>
        <li>참고2: <a href='https://pythonq.com/so/javascript/1224549'>javascript = Node.js는 FTP에 연결하고 파일을 다운로드합니다</a></li>
    </ol>
    \`
    `;
    const template = SIDEBAR_BODY('', body, '');
    res.send(template);
}

export const show_tree = (req, res) => {
    const template = SIDEBAR_BODY();
    res.send(template);
}

export const show_chart = (req, res) => {
    fs.readFile('data/traffic.json', 'utf8', (err, myData) => {
        if (err) throw err;
        else {
            myData = JSON.parse(myData);
            myData = JSON.stringify(myData);
            const body = CHART_BODY(myData);
            const template = SIDEBAR_BODY(body, '');
            res.send(template);
        }
    });
}

export const show_timeLine = (req, res) => {
    const template = SIDEBAR_BODY();
    res.send(template);
}

export const show_drop_file_upload = (req, res) => {
    const template = SIDEBAR_BODY();
    res.send(template);
}