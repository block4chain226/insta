import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FindAllEvent } from './find-all.event';

@EventsHandler(FindAllEvent)
export class FindAllHandlerEvent implements IEventHandler<FindAllEvent> {
  async handle({ id }: FindAllEvent) {
    console.log('find all successfull...');
  }
}
