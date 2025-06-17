 import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users=[
        {
            id:1,
            fname:'John',
            lname:'Doe',
            age:25
        },
        {
            id:2,
            fname:'Jane',
            lname:'Dee',
            age:24
        }
    ];

  findAll() {
    return this.users;
  }
}
