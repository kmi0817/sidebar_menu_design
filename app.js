import express from 'express';

import {
    show_index, show_ftp_download, show_tree,
    show_chart, show_timeLine, show_drop_file_upload
} from './controller/app.js';


const HOSTNAME = 'localhost';
const PORT = 3003;

const app = express();

app.get('/', show_index);
app.get('/ftp_download', show_ftp_download)
app.get('/tree', show_tree);
app.get('/chart', show_chart);
app.get('/timeLine', show_timeLine);
app.get('/drop_file_upload', show_drop_file_upload);


app.listen((PORT), () => {
    console.log(`The server is running on ${PORT}`);
});