import { IsIn, IsNumber, IsString, IsOptional, IsArray } from 'class-validator'

export class CreateArticleDto {
	@IsString()
	title: string

	@IsString()
	@IsOptional()
	description: string

	@IsString()
	@IsOptional()
	cover_image_url: string

	@IsString()
	@IsOptional()
	content: string

	@IsNumber()
	@IsIn([0, 1])
	state: number

	@IsOptional()
	@IsArray()
	@IsNumber({}, { each: true })
	tags: number[]
}

export class UpdateArticleDto {
	@IsString()
	title: string

	@IsString()
	@IsOptional()
	description: string

	@IsString()
	@IsOptional()
	cover_image_url: string

	@IsString()
	@IsOptional()
	content: string

	@IsNumber()
	@IsIn([0, 1])
	state: number

	@IsOptional()
	@IsArray()
	@IsNumber({}, { each: true })
	tags: number[]
}
