import { UserController } from '$lib/database/user'
import type { RequestEvent } from '@sveltejs/kit';
import {} from '$lib/cripto/cripto.util'


export function GET( request : RequestEvent){
  // Can be: 
  /*
    - Get One user
  */
}
export function POST(request: RequestEvent){
  // Can be: 
  /*
    - Create user (#self) 
  */

}
export function PUT(request: RequestEvent){
  // Can be: 
  /*
    - Update One user (#self)(#authenticated)
  */
}
export function DELETE(request: RequestEvent){
  // Can be: 
  /*
    - Delete One user (#self)(#authenticated)
    -
  */
}