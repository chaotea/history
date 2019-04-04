let app = new Vue({
	el: "#app",
	data: {
		counter: 0,
		intro: "The Conquerors",
		name: null,
		epithet: null,
		titles: null,
		description: null,
		quote: null,
		image: null
	},
	computed: {
		numPeople: function() {
			return Object.keys(people).length
		},
		rank: function() {
			return this.numPeople - this.counter + 1
		},
		showIntro: function() {
			return (this.counter == 0 || this.counter == this.numPeople + 1)
		}
	},
	methods: {
		getData: function() {
			if (this.counter == 0) {
				this.clearData()
				this.intro = "The Conquerors"
			} else if (this.counter == this.numPeople + 1) {
				this.clearData()
				this.intro = "The End."
			} else {
				this.name = people[this.rank]["name"]
				this.epithet = people[this.rank]["epithet"]
				this.description = people[this.rank]["description"]
				this.quote = people[this.rank]["quote"]
				this.image = people[this.rank]["image"]
				let titles = people[this.rank]["titles"]
				if (titles.length == 1) {
					this.titles = titles[0]
				} else if (titles.length == 2) {
					this.titles = titles.join(" and ")
				} else {
					this.titles = titles.slice(0, titles.length - 1).join(", ") + ", and " + titles[titles.length-1]
				}
			}
		},
		clearData: function() {
			this.name = null
			this.epithet = null
			this.titles = null
			this.description = null
			this.quote = null
			this.image = null
		},
		next: function() {
			if (this.counter < this.numPeople + 1) {
				this.counter += 1
				this.getData()
			}
		},
		previous: function() {
			if (this.counter > 0) {
				this.counter -= 1
				this.getData()
			}
		}
	},
	mounted() {
		window.addEventListener("keyup", function(event) {
			if (event.keyCode == 39) {
				app.next()
			} else if (event.keyCode == 37) {
				app.previous()
			}
		})
	}
})