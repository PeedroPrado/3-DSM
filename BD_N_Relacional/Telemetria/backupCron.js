const cron = require("node-cron");
const { exec } = require("child_process");


const mongoDumpPath = `"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump.exe"`;


const backupFolder = "C:\\BackupsMongo";


cron.schedule("0 0 * * *", () => {
  console.log("Iniciando backup diário do MongoDB...");

 
  const date = new Date().toISOString().split("T")[0];

  
  const command = `${mongoDumpPath} --db=telemetria_race --out="${backupFolder}\\telemetria_${date}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Erro ao executar backup:", error.message);
      return;
    }
    console.log("Backup concluído com sucesso!");
  });
});

console.log("Agendador de backup no Windows iniciado.");
