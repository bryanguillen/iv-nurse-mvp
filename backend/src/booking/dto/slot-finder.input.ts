import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SlotFinderInput {
  @Field()
  nurseId: string;

  @Field()
  serviceId: string;

  @Field()
  start: string;

  @Field({ nullable: true })
  end?: string;
}
