const defaults = {

	neo4j: {
		initialQuery: `MATCH (n) WHERE exists(n.pagerank)
                        WITH (n), RAND() AS random
                        ORDER BY random LIMIT 3000
                        OPTIONAL MATCH (n)-[r]-(m)
                        //WITH n,r,m WHERE exists(n.pagerank) AND exists(m.pagerank) AND exists(m.community)
                        RETURN n, r, m;`,
		neo4jUri: 'bolt://localhost:7687',
		neo4jUser: 'neo4j',
		neo4jPassword: 'neo4j',
		encrypted: 'ENCRYPTION_OFF',
		trust: 'TRUST_ALL_CERTIFICATES'
	},

	visjs: {
		interaction: {
			hover: true,
			hoverConnectedEdges: true,
			selectConnectedEdges: false,
			//        multiselect: true,
			multiselect: 'alwaysOn',
			zoomView: false,
			experimental: {}
		},
		physics: {

			// barnesHut: {
			// 	theta: 0.5,
			// 	gravitationalConstant: -2000,
			// 	centralGravity: 0.3,
			// 	springLength: 95,
			// 	springConstant: 0.04,
			// 	damping: 0.09,
			// 	avoidOverlap: 0
			//   },


			barnesHut: {
				damping:0.1,
			}
		},
		nodes: {
			mass: 4,
			shape: 'neo',
			labelHighlightBold: false,
			widthConstraint: {
				maximum: 40
			},
			heightConstraint: {
				maximum: 40
			}
		},
		edges: {
			hoverWidth: 0,
			selectionWidth: 0,
			smooth: {
				type: 'continuous',
				roundness: 0.15
			},
			font: {
				size: 9,
				strokeWidth: 0,
				align: 'top'
			},
			color: {
				inherit: false
			},
			arrows: {
				to: {
					enabled: true,
					type: 'arrow',
					scaleFactor: 0.5
				}
			}
		}

	}
};



export { defaults };