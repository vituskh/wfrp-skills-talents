let skills
let skillsNames

let talents
let talentsNames

let searched = false

function loadInfo(type, name) {
    if (searched) {
        for (let i = 0; i < talentsNames.length; i++) {
            document.getElementById(`talent_${talentsNames[i]}`).classList.remove('searchResult')
        }
        for (let i = 0; i < skillsNames.length; i++) {
            document.getElementById(`skill_${skillsNames[i]}`).classList.remove('searchResult')
        }
        searched = false
    }
    if (type == "skill") {
        const element = skills.get(name)
        document.getElementById("onlyforskills").hidden = false
        document.getElementById("infoName").textContent = name
        document.getElementById("infoChar").textContent = element.characteristic
        document.getElementById("infoType").textContent = element.type
        document.getElementById("infoDescription").textContent = element.description

    } else {
        const element = talents.get(name)
        document.getElementById("onlyforskills").hidden = true
        document.getElementById("infoName").textContent = name
        document.getElementById("infoDescription").textContent = element.description

    }
}

function loadSkillsAndTalents() {
    fetch('./talents.json', {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            let entries = Object.entries(data)
            talentsNames = entries.map(entry => entry[0])
            talents = new Map(entries)
             
            
            //Create buttons for talents
            let talentsFragment = document.createDocumentFragment()
            entries.forEach(([key, value]) => {
                let talent = document.createElement("button")
                talent.textContent = key
                talent.id = `talent_${key}`
                talent.classList.add('talent')
                talent.addEventListener("click", () => loadInfo("talent", key))

                talentsFragment.appendChild(talent)
            })
            document.getElementById("talents").innerHTML = ""
            document.getElementById("talents").appendChild(talentsFragment)

        })

    fetch('./skills.json', {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            let entries = Object.entries(data)
            skillsNames = entries.map(entry => entry[0])
            skills = new Map(entries)

            //Create buttons for skills
            let skillsFragment = document.createDocumentFragment()
            entries.forEach(([key, value]) => {
                let skill = document.createElement("button")
                skill.textContent = key
                skill.id = `skill_${key}`
                skill.classList.add('skill')
                skill.addEventListener("click", () => loadInfo("skill", key))

                skillsFragment.appendChild(skill)
            })
            document.getElementById("skills").innerHTML = ""
            document.getElementById("skills").appendChild(skillsFragment)

        })
}

function search(searchFor) {
    if (searched) {
        for (let i = 0; i < talentsNames.length; i++) {
            document.getElementById(`talent_${talentsNames[i]}`).classList.remove('searchResult')
        }
        for (let i = 0; i < skillsNames.length; i++) {
            document.getElementById(`skill_${skillsNames[i]}`).classList.remove('searchResult')
        }
    }
    if (searchFor == "") {
        searched = false
        return
    }

    //Search talents
    for (let i = 0; i < talentsNames.length; i++) {
        if (talentsNames[i].toLowerCase().includes(searchFor.toLowerCase())) {
            document.getElementById(`talent_${talentsNames[i]}`).classList.add('searchResult')
        }
    }

    //Search skills
    for (let i = 0; i < skillsNames.length; i++) {
        if (skillsNames[i].toLowerCase().includes(searchFor.toLowerCase())) {
            document.getElementById(`skill_${skillsNames[i]}`).classList.add('searchResult')
        }
    }
    


    searched = true
}

document.addEventListener("DOMContentLoaded", () => {
    loadSkillsAndTalents()
})