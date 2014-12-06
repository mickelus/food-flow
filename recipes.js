var recipes = {
	soup: {
		title: "Rostad paprikasoppa",
		steps: [
			{
				id: 0,
				description: "Sätt ugnen på 250 grader C",
				requires: []
			},
			{
				id: 1,
				description: "Olja en plåt",
				requires: [0]
			},
			{
				id: 2,
				description: "Dela och kärna ur 5 röda paprikor",
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
				requires: [5]
			},
			{
				id: 7,
				description: "Skala och hacka 1 rödlök",
				requires: [6]
			},
			{
				id: 8,
				description: "Häll 2 matskedar olivolja i en kastrull",
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
				requires: [12]
			},
			{
				id: 14,
				description: "Mixa helt slät med en mixer",
				requires: [13]
			},
			{
				id: 15,
				description: "Smaka av med salt och peppar",
				requires: [14]
			},
			{
				id: 16,
				description: "Servera med olivkräm",
				requires: [15]
			}
		]
	}
};