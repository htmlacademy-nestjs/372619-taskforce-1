import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { AvailableCity, TaskStatus } from '@project/libs/shared-types';

export class TaskRdo {
  @ApiProperty({
    description: 'Unique identifier',
    example: '4ff6e921-36c4-4f80-ae41-919c06c0c5c3',
  })
  @Expose()
  public id?: string;

  @ApiProperty({
    description: "Task's title",
    example: 'Todo title',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Extended description',
    example: 'Details about task',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'One of existing category',
    example: 'Engineering',
  })
  @Expose()
  @Transform(({ obj }) => obj.category.name)
  public category: string;

  @ApiProperty({
    description: 'Service price',
    example: 1000,
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Date of completion task',
    example: '2023-12-13T21:06:44.253Z',
  })
  @Expose()
  public executionDate: string;

  @ApiProperty({
    description: 'Picture',
    example: 'example.png',
  })
  @Expose()
  public imageUrl: string;

  @ApiProperty({
    description: 'The address where the task should be performed',
    example: 'Moscow, Presnenskaya embankment, 12, office No. 2',
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Tags for the task',
    example: ['engineering', 'moscow'],
    isArray: true,
    type: String,
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: "User's city",
    enum: AvailableCity,
    example: AvailableCity.Moscow,
  })
  @Expose()
  @Transform(({ obj }) => obj.city.name)
  public city: AvailableCity;

  @ApiProperty({
    description: "Task's status",
    enum: TaskStatus,
    example: TaskStatus.New,
  })
  @Expose()
  @Transform(({ obj }) => obj.status.name)
  public status: TaskStatus;

  @ApiProperty({
    description: "Task's customer",
    example: 'da7f1411-dd49-4689-a2de-cda2f0e9bf85',
  })
  @Expose()
  public customerId: string;

  @ApiProperty({
    description: "Task's contractor",
    example: 'da7f1411-dd49-4689-a2de-cda2f0e9bf85',
  })
  @Expose()
  public contractorId: string;

  @ApiProperty({
    description: 'Date of creation task',
    example: '2023-12-13T21:06:44.253Z',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Task update date',
    example: '2023-12-13T21:06:44.253Z',
  })
  @Expose()
  public updatedAt: string;
}
