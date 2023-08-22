import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ _id: true, autoIndex: false })
export class Users {
  @Prop()
  fullname: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UsersSchema: any = SchemaFactory.createForClass(Users);

export const EmployeesSchemaModel: any = mongoose.model(
  Users.name,
  UsersSchema,
);
