import { faker } from "@faker-js/faker";

  const mokingSchema = ()=>{
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int(),
        category: faker.commerce.productAdjective(),
        status: faker.datatype.boolean(),
        code: faker.string.uuid(),
        thumbails: faker.image.url()
    }
}

export default mokingSchema()

