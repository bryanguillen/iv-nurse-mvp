import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetAppointmentsInput {
  @Field()
  nurseId: string;

  @Field()
  start: string; // YYYY-MM-DD, fetches all appts that day

  @Field({ nullable: true })
  end?: string;
}
