// TODO:
// ! Change test code to prisma code
// ! Add hashing
import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

// * test code:
export type User = { id: number, email: string, password: string }; // todo update return type (from prisma or so)


@Injectable()
export class UsersService {
  // constructor(private readonly prisma: PrismaService) {}

  private readonly saltOrRound: number = 10;

  // * test code:
  private users: User[] = [
    { id: 1, email: 'test@email.com', password: 'password' },
    { id: 2, email: 'admin@printspot.com', password: 'admin' },
  ];

  // All
  // ? async findAll() {}

  // Select
  async findOne(id: number): Promise<any> {
    // * test code:
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<any> {
    // * test code:
    return this.users.find(user => user.email === email);
  }

  // ? async findOneByPhone() {}

  // Create 
  async create(email: string, password: string): Promise<any> {
    // * test code:
    if (await this.findByEmail(email))
      return undefined;

    const user = { id: this.users.length + 1, email: email, password: password };
    this.users.push(user);
    return user;
  }

  // Update
  // async update() {}

  // Delete
  // async remove() {}
}
