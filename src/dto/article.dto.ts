import { IsNumber, IsString, IsOptional, IsArray, IsBoolean } from 'class-validator'

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

	@IsBoolean()
	published: boolean

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

	@IsBoolean()
	published: boolean

	@IsOptional()
	@IsArray()
	@IsNumber({}, { each: true })
	tags: number[]
}
