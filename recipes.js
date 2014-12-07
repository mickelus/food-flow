var recipes = {
	soup: {
		title: "Rostad paprikasoppa",
		steps: [
			{
				id: 0,
				description: "Sätt ugnen på 250 grader C",
				tools: ["ugn"],
				requires: []
			},
			{
				id: 1,
				description: "Olja en plåt",
				tools: ["ugnsplåt"],
				ingredients: ["olja"],
				requires: [0]
			},
			{
				id: 2,
				description: "Dela och kärna ur 5 röda paprikor",
				tools: ["skärbräda", "kniv"],
				ingredients: ["5 röda paprikor"],
				requires: [1]
			},
			{
				id: 3,
				description: "Lägg paprikorna med snittytan ner på plåten",
				requires: [2]
			},
			{
				id: 4,
				description: "Rosta paprikorna i ugnen tills de är mjuka och skalet har fått färg",
				requires: [3]
			},
			{
				id: 5,
				description: "Dra av skalen från paprikorna",
				requires: [4]
			},
			{
				id: 6,
				description: "Skala och hacka 2 vitlöksklyftor",
				ingredients: ["2 vitlöksklyftor"],
				requires: [5]
			},
			{
				id: 7,
				description: "Skala och hacka 1 rödlök",
				ingredients: ["1 rödlök"],
				requires: [6]
			},
			{
				id: 8,
				description: "Häll 2 matskedar olivolja i en kastrull",
				tools: ["kastrull"],
				ingredients: ["2 matskedar olivolja"],
				requires: [7]
			},
			{
				id: 9,
				description: "Fräs vitlöken och rödlök i kastrullen tills de är mjuka",
				requires: [8]
			},
			{
				id: 10,
				description: "Grovhacka 3 tomater",
				ingredients: ["3 tomater"],
				requires: [9]
			},
			{
				id: 11,
				description: "Grovhacka paprikorna",
				requires: [10]
			},
			{
				id: 12,
				description: "Lägg tomaterna och paprikorna i kastrullen och låt fräsa i 5 minuter",
				requires: [11]
			},
			{
				id: 13,
				description: "Häll på 8 dl grönsaksbuljong och låt sjuda i 10 minuter",
				ingredients: ["8 dl grönsaksbuljong"],
				requires: [12],
				delay: 300
			},
			{
				id: 14,
				description: "Mixa helt slät med en stavmixer",
				tools: ["stavmixer"],
				requires: [13],
				delay: 600
			},
			{
				id: 15,
				description: "Smaka av med salt och peppar",
				ingredients: ["salt", "svartpeppar"],
				requires: [14]
			},
			{
				id: 16,
				description: "Servera med olivkräm",
				ingredients: ["olivkräm"],
				requires: [15]
			}
		]
	},
	kalpudding: {
		title: "Kålpudding",
		steps: [
			{
				id: 0,
				description: "Sätt ugnen på 200 grader C",
				tools: ["ugn"],
				requires: []
			},
			{
				id: 1,
				description: "Koka 900 g potatis",
				ingredients: ["900 g potatis"],
				tools: ["kastrull"],
				requires: [0]
			},
			{
				id: 2,
				description: "Blanda 1/2 dl ströbröd med 1 dl vatten, 1/2 tsk salt, 1 krm peppar och 2 msk dijonsenap. Låt svälla någon minut",
				ingredients: ["1/2 dl ströbröd", "1/2 tsk salt", "1 krm peppar", "2 msk dijonsenap"],
				tools: ["bunke"],
				requires: [1]
			},
			{
				id: 3,
				description: "Blanda ner ca 500 g blandfärs",
				ingredients: ["ca 500 g blandfärs"],
				requires: [2],
				delay: 60
			},
			{
				id: 4,
				description: "Bred ut blandningen i en ugnssäker form och grädda mitt i ugnen i ca 20 minuter",
				tools: ["ugnssäker form"],
				requires: [3]
			},
			{
				id: 5,
				description: "Skär bort den hårda rotstocken på vitkålen (400 g)",
				ingredients: ["400 g vitkål"],
				tools: ["kniv", "skärbräda"],
				requires: [4]
			},
			{
				id: 6,
				description: "Striml kålen",
				requires: [5]
			},
			{
				id: 7,
				description: "Lägg 2 msk smör eller margarin i en stekpanna",
				ingredients: ["2  msk smör eller margarin"],
				tools: ["stekpanna"],
				requires: [6]
			},
			{
				id: 8,
				description: "Bryn vitkålen lätt i stekpannan",
				requires: [7]
			},
			{
				id: 9,
				description: "Ringla över 2 msk honung eller sirap",
				ingredients: ["2 msk honung eller sirap"],
				requires: [8]
			},
			{
				id: 10,
				description: "Häll över 2 1/2 dl matlagningsgrädde och låt sjuda i 5 minuter",
				ingredients: ["2 1/2 dl matlagningsgrädde"],
				requires: [9]
			},
			{
				id: 11,
				description: "Red såsen med 1 tsk majsstärkelse och smaka av med salt och peppar",
				ingredients: ["1 tsk majsstärkelse"],
				requires: [10],
				delay: 300
			},
			{
				id: "T",
				description: "Tag ut köttfärsen ur ugnen",
				requires: [4],
				delay: 1200
			},
			{
				id: 12,
				description: "Häll såsen över köttfärsen",
				requires: [11, "T"]
			},
			{
				id: 13,
				description: "Servera Kålpudding med kokt potatis",
				requires: [12]
			}
		]
	}
};
