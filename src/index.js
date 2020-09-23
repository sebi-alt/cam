const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    title: 'Cam',
    icon: path.normalize(path.join(__dirname, '../resources/icon/icon.png')),
    backgroundColor: '#f2f2f2',
    resizable: true
    // skipTaskbar: true
  });

  mainWindow.loadFile(path.join(__dirname, 'main.html'));

  // mainWindow.webContents.openDevTools();
};
app.on('ready', () => {
  createWindow();
  let toggle_window_top = true;
  ipcMain.on('window_change', (event, arg) => {
    switch (arg) {
      case 'm':
        mainWindow.minimize();
        break;
      case 't':
        if (toggle_window_top) mainWindow.setAlwaysOnTop(true);
        else mainWindow.setAlwaysOnTop(false);
        toggle_window_top = !toggle_window_top;
        break;
      case 'c':
        app.quit();
        break;
    }
  })
}
);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});