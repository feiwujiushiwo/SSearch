document.addEventListener('DOMContentLoaded', function () {
    // 自动填充当前域名
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = new URL(tabs[0].url);
        document.getElementById('domain').value = url.hostname;
    });

    // 按钮事件绑定
    document.getElementById('btn-password').addEventListener('click', () => search('password'));
    document.getElementById('btn-files').addEventListener('click', () => search('files'));
    document.getElementById('btn-student_id').addEventListener('click', () => search('student_id'));
    document.getElementById('btn-email').addEventListener('click', () => search('email'));
});

const templates = {
    password: 'intext:password',
    files: 'filetype:pdf | filetype:xls | filetype:docx',
    student_id: '"student id" | 学号',
    email: 'intext:@"'
};

function search(type) {
    const domain = document.getElementById('domain').value.trim();
    if (!domain) {
        alert("请输入域名！");
        return;
    }

    const dork = `site:${domain} ${templates[type]}`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dork)}`;

    chrome.tabs.create({ url: searchUrl });
}
