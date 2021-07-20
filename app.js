import express from 'express';
import bodyParser from 'body-parser';

import {
    show_index, show_ftp_download, show_tree,
    show_chart, show_timeLine, show_drop_file_upload, sftp_download
} from './controller/app.js';

const PORT = 3003;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', show_index);
app.get('/ftp_download', show_ftp_download)
app.get('/tree', show_tree);
app.get('/chart', show_chart);
app.get('/timeLine', show_timeLine);
app.get('/drop_file_upload', show_drop_file_upload);

app.get('/sftp_download', sftp_download);

app.listen((PORT), () => {
    console.log(`The server is running on ${PORT}`);
});