Speckle Library
==

Overview
--

Create SPARQL rules and queries using a typed API

Usage
--

Install:
```
npm install speckle
```

Basic Usage:

```TypeScript
import * as s from 'speckle'

let ex = s.prefix('l', 'http://example/')

// Create a sparql rule set
let city = s.variable('city')
let country = s.variable('country')
let continent = s.variable('continent')

let rule = rule('cityInContinent')
  .when(city, ex.uri('isIn'), country)
  .and(country, ex.uri('isPartOf'), continent)
  .then(city, ex.uri('isIn'), continent)

// Serialise to SPARQL
let sparql = rule.toSparql()

// Create a sparql query
let query = s.select(continent).where(ex.uri('London'), logic.uri('isIn'), continent)

// Serialise to SPARQL
sparql = query.toSparql()
```
