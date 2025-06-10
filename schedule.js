document.addEventListener('DOMContentLoaded', () => {
    const importButton = document.getElementById('import-schedule');
    const fileInput = document.getElementById('schedule-file');
    const scheduleTable = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];

    // 初始化课程表
    initializeSchedule();

    // 导入按钮点击事件
    importButton.addEventListener('click', () => {
        fileInput.click();
    });

    // 文件选择事件
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                
                // 处理数据并更新课程表
                updateSchedule(jsonData);
            };
            reader.readAsArrayBuffer(file);
        }
    });

    // 初始化课程表
    function initializeSchedule() {
        const timeSlots = [
            '8:00-8:45', '8:55-9:40', '10:00-10:45', '10:55-11:40',
            '14:00-14:45', '14:55-15:40', '16:00-16:45', '16:55-17:40'
        ];

        scheduleTable.innerHTML = '';
        timeSlots.forEach(time => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${time}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            `;
            scheduleTable.appendChild(row);
        });
    }

    // 更新课程表
    function updateSchedule(data) {
        // 清空现有课程表
        const rows = scheduleTable.getElementsByTagName('tr');
        for (let row of rows) {
            const cells = row.getElementsByTagName('td');
            for (let i = 1; i < cells.length; i++) {
                cells[i].textContent = '';
            }
        }

        // 填充新数据
        data.forEach((row, rowIndex) => {
            if (rowIndex > 0) { // 跳过表头
                const cells = rows[rowIndex - 1].getElementsByTagName('td');
                row.forEach((cell, cellIndex) => {
                    if (cellIndex > 0 && cellIndex < cells.length) {
                        cells[cellIndex].textContent = cell || '';
                    }
                });
            }
        });

        // 保存到本地存储
        localStorage.setItem('scheduleData', JSON.stringify(data));
    }

    // 从本地存储加载课程表
    const savedData = localStorage.getItem('scheduleData');
    if (savedData) {
        updateSchedule(JSON.parse(savedData));
    }
}); 