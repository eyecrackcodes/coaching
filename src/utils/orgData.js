// src/utils/orgData.js

// Let's add a debug check first
const orgData = {
    "Luminary_Life_Sales_Org": {
        "Total_Agents": 86,
        "Austin": {
            "Director": "Chad Steadham",
            "Managers": {
                "Anthony Patton": {
                    "Agents": [
                        "Alisha O'Bryant",
                        "Billy Slater", 
                        "Drew Lombard",
                        "Iesha Alexander",
                        "Jremekyo Anderson",
                        "Kierra Smith",
                        "Tim Dominguez"
                    ]
                },
                "Patricia Lewis": {
                    "Agents": [
                        "Chris Brown",
                        "David Druxman",
                        "Jonathan Mejia",
                        "Jovon Holts",
                        "Leif Carlson",
                        "Will Knight",
                        "Brandon Escort"
                    ]
                },
                "Lanae Edwards": {
                    "Agents": [
                        "Amy Slusarski",
                        "Duncan Ordenana",
                        "Jack Benken",
                        "Magifira Jemal",
                        "Rachel Choate",
                        "Jeff Korioth",
                        "Andy Nickleson"
                    ]
                },
                "Frederick Holguin": {
                    "Agents": [
                        "Austin Houser",
                        "Doug Curtright",
                        "Eric Marrs",
                        "John Sivy",
                        "Micah Black",
                        "Ron Rydzfski",
                        "Roza Veravillalba"
                    ]
                },
                "Mario Herrera": {
                    "Agents": [
                        "Amber Hartwick",
                        "Diana Roe",
                        "Jaime Valdez",
                        "Justin Hinze",
                        "Mark Garcia",
                        "Michelle Brown",
                        "Dawn Dawson"
                    ]
                },
                "Sandy Benson": {
                    "Agents": [
                        "Patricia Gomez",
                        "Nikia Lewis",
                        "Drew Lombard",
                        "Kierra Smith",
                        "Will Knight",
                        "Jeff Korioth",
                        "Ron Rydzfski"
                    ]
                }
            }
        },
        "Charlotte": {
            "Director": "Trent Terrell",
            "Managers": {
                "Vincent Blanchett": {
                    "Agents": [
                        "Angel Harris",
                        "Camryn Anderson",
                        "Damond Outing",
                        "Arlethe Guevara",
                        "Alvin Fulmore",
                        "Wenny Gooding",
                        "Beau Carson"
                    ]
                },
                "Nisrin Hajmahmoud": {
                    "Agents": [
                        "Adelina Guardado",
                        "Chris Chen",
                        "John Hunter Case",
                        "Asaad Weaver",
                        "Joseph Coleman",
                        "Montrell Morgan",
                        "Quinn McLeod"
                    ]
                },
                "Jovan Espinoza": {
                    "Agents": [
                        "Da'von Loney",
                        "Dustin Gunter",
                        "Kenya Caldwell",
                        "Doug Yang",
                        "Jahne Spears",
                        "Miguel Roman",
                        "Kyle Williford"
                    ]
                },
                "Katelyn Helms": {
                    "Agents": [
                        "Cameran Sanders",
                        "Dawn Strong",
                        "Gabrielle Smith",
                        "Jimmie Royster IV",
                        "Pete Nguyen",
                        "Tyler Jacobson",
                        "Damien King"
                    ]
                },
                "Brent Lahti": {
                    "Agents": [
                        "Alexis Alexander",
                        "Lynethe Guevara",
                        "John Hubbard",
                        "Robert Carter",
                        "Alexia Salinas",
                        "Dennis Smith",
                        "Mitchell Pittman"
                    ]
                },
                "Brook Coyne (MIT)": {
                    "Agents": [
                        "Serena Cowan",
                        "Tawanda Bennett",
                        "Denasia Paul",
                        "Kevin Gray",
                        "Vannak Suos",
                        "Chauncey Smith",
                        "Telor Miller"
                    ]
                }
            }
        }
    }
};

// Add a debug check
console.log("Austin Managers:", Object.keys(orgData.Luminary_Life_Sales_Org.Austin.Managers));
console.log("Charlotte Managers:", Object.keys(orgData.Luminary_Life_Sales_Org.Charlotte.Managers));

module.exports = { orgData };