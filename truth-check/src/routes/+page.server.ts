import { UserController } from '$lib/database/user'
import { ResourceController } from '$lib/database/resource'
import { Prisma } from '@prisma/client'
import { json } from '@sveltejs/kit'




// Create a user

const user = {
  name: 'userTest',
  email: 'emailTest',
  password: 'passwordTest'
}

// let createdUser = await UserController.create(user)
// console.log(createdUser)

/*
{
  id: 3,
  lastUpdate: null,
  creationDate: 2054194346,
  disabled: false,
  name: 'userTest',
  email: 'emailTest',
  password: '$2b$10$3.FxC2og5qSPgzDHKnnAGueK0gOc2naQkQ9HASYFE0DdMKANAoffC',
  salt: '$2b$10$SW/HeUjPrNOj1mU/Elhddu'
}
*/
// Create a resource
const resource = {
  data: {},
  description: 'DescripcionResourceTest',
  imageURI: 'ImageURIResourceTest',
  name: 'ResourceTestName',
  isVisible: true
}
// let createdResource = await ResourceController.create(3, resource)
// console.log(createdResource)
/*
{
  id: 1,
  creationDate: 2054584091,
  authorID: 3,
  hasVisibleVersions: true,
  versions: [
    {
      data: {},
      description: 'DescripcionResourceTest',
      imageURI: 'ImageURIResourceTest',
      isVisible: true,
      name: 'ResourceTestName',
      updatedAt: 2054584091,
      version: 0
    }
  ]
}
 */