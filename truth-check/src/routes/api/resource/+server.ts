import { ResourceController } from '$lib/database/resource'
import type { RequestEvent } from '@sveltejs/kit';
import {} from '$lib/cripto/cripto.util'


export function GET( request : RequestEvent){
  // Can be: 
  /*
    - Get One resource
    - Get Many resources (#cursor)
  */
}
export function POST(request: RequestEvent){
  // Can be: 
  /*
    - Create resource (#authenticated)
  */

}
export function PUT(request: RequestEvent){
  // Can be: 
  /*
    - Update resource (#authenticated)
  */
}
export function DELETE(request: RequestEvent){
  // Can be: 
  /*
    - Delete resource (#authenticated)
    -
  */
}