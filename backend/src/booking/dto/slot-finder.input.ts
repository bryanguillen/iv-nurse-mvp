import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SlotFinderInput {
  @Field()
  nurseId: string;

  @Field()
  start: string;

  @Field()
  end: string;
}
