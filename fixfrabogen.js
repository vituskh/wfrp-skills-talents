function changed(selector) {
    if(selector.value == "talent") {
        document.getElementById("talent").hidden = false
        document.getElementById("skill").hidden = true
    } else {
        document.getElementById("talent").hidden = true
        document.getElementById("skill").hidden = false
    }
}
if(selector.value == "talent") {
    document.getElementById("talent").hidden = false
    document.getElementById("skill").hidden = true
} else {
    document.getElementById("talent").hidden = true
    document.getElementById("skill").hidden = false
}
function skillChange() {
    var output = {
        type: "",
        characteristic: "",
        description: ""
    }
    
    let name = cleanName(document.getElementById("skillname").value)
    output.characteristic = document.getElementById("skillchar").value.replace(/\t/g, " ")
    output.type = document.getElementById("skilltype").value.replace(/\t/g, " ")
    output.description = document.getElementById("skilldescription").value.replace(/\t/g, " ")

    document.getElementById("output").value = "\"" + name + "\":" +  JSON.stringify(output, null, "\t") + ","
}
function talentChange() {
    var output = {
        description: ""
    }

    let name = cleanName(document.getElementById("talentname").value)
    output.description = document.getElementById("talentdescription").value.replace(/\t/g, " ")
    document.getElementById("output").value = "\"" + name + "\":" +  JSON.stringify(output, null, "\t") + ","

}

function cleanName(name) {
    name = name
        .replace(/\t/g, " ")
        .replace(/\s\s+/g, " ")
        .trim()
        .toLowerCase()
    name = name.charAt(0).toUpperCase() + name.slice(1)
    //capitalize after space
    name = name.replace(/\s(.)/g, (_, group1) => {
        return " " + group1.toUpperCase();
    });
    return name
}
