// the simplest extension - a function that must return objecct wtih resolvers for the fields added in the schema
module.exports = () => ({
  // define extra resolvers
  resolvers: {
    // in the schema we've extended Product type - it has now "additionalContent" property 
    // so we have to define the resolver for that field
    Product: {
      // this is a "standard" GraphQL resolver, first parameter is obj which is the parent 
      // of the current property, so it's a reference to resolved Product data
      additionalContent: (obj, params, context, info) => {
        // here you can get the value of this field from any place (rest api call etc)
        return `This product has id=${obj.id} and name "${obj.name}"`;
      }
    }
  }
});