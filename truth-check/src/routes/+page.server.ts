import { prisma } from '$lib/database/database'
import { Prisma } from '@prisma/client'
import { json } from '@sveltejs/kit'

// TEST Users: 
/*
  Create user
  Modify user
  Delete user
  Get    user
*/

const user: Prisma.UserCreateInput = {
  name: 'TestUser Name',
  email: 'TestUser Email',
  password: 'TestUser Password',//Should be salted and hashed
  salt: 'TestUser Salt',
  creationDate: Date.now()
}


// console.log('Creating user')
// const createdUser = await prisma.user.create({
//   data: user,
// })
// console.log(createdUser)

// console.log('Modifiying user')
// const updatedUser = await prisma.user.update({
//   data: {
//     email: 'Modified TestUser Email'
//   },
//   where: {
//     id: createdUser.id
//   }
// })
// console.log(updatedUser)
// // console.log('Deleting user')
// // const deletedUser = await prisma.user.delete({
// //   where: {
// //     id: createdUser.id
// //   }
// // })
// // console.log(deletedUser)
console.log('Finding user')
const foundUser = await prisma.user.findFirst({
  where: {
    name: 'TestUser Name'
  },
  include: {
    createdResources: {
      orderBy: {
        creationDate: Prisma.SortOrder.desc
      },
      include: {
        versions: {
          orderBy: {
            updatedAt: Prisma.SortOrder.desc
          }
        }
      }
    },
    likedResource: {
      include: {
        versions: {
          orderBy: {
            updatedAt: Prisma.SortOrder.desc
          }
        }
      }
    }
  }
})
console.log(foundUser)


// TEST Resoruce
/*
  Create user
  Modify user
  Delete user
  Get    user
*/

const resource: Prisma.ResourceCreateInput = {
  versions: {
    create: {
      name: 'Created version',
      description: 'A version created for a resource',
      imageURI: 'version1.png',
      data: {
        prop1: 2
      }
    }
  },
  author: {
    connect: {
      id: foundUser?.id
    }
  },
  hasVisibleVersions: true
}

// console.log('Creating resource')
// const createdResource = await prisma.resource.create({
//   data: resource
// })
// console.log(createdResource)
// console.log('Modifiying resource')
// const modifiedResource = await prisma.resource.update({
//   data: {
//     versions: {
//       create: {
//         version: 2,
//         name: 'Version 2',
//         description: 'The second version?!',
//         imageURI: 'image2',
//         data: {
//           prop1: 'version 2'
//         }
//       }
//     }
//   },
//   where: {
//     id: createdResource.id
//   },
//   include: {
//     versions: {
//       orderBy: {
//         updatedAt: Prisma.SortOrder.desc
//       }
//     }
//   }
// })
// console.log(modifiedResource)
// // console.log('Deleting resource')
// // const deletedResource = await prisma.resource.delete({
// //   where: {
// //     id: createdResource.id
// //   }
// // })
// // console.log(deletedResource)
console.log('Finding resource')
const foundResource = await prisma.resource.findFirst({
  where: {
    author: {
      id: foundUser?.id
    }
  },
  include: {
    versions: {
      orderBy: {
        updatedAt: Prisma.SortOrder.desc
      }
    }
  }
})
console.log(foundResource)

console.log('Adding like')
const giveLike = await prisma.user.update({
  data: {
    likedResource: {
      connect: {
        id: foundResource?.id
      }
    }
  },
  where: {
    id: foundUser?.id
  },
  include: {
    likedResource: {
      include: {
        versions: {
          orderBy: {
            updatedAt: Prisma.SortOrder.desc
          }
        }
      }
    }
  }
})
console.log(giveLike)

await prisma.$disconnect()

export function load() {
  console.log(foundUser) // TODO Find a way to deal with devalu not parsing Dtae objects 😠
  return foundUser
}