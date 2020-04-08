async function getISS(){
    const response = await fetch("./commands.json");
    const data = await response.json();
    data.forEach(cmd => {
        const name = cmd.name;
        const help = cmd.desc;
        console.log(name);
    });
}

getISS();