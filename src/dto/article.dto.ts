import { IsIn, IsNumber, IsString, IsOptional } from 'class-validator'

export class CreateArticleDto {
	@IsString()
	title: string

	@IsString()
	@IsOptional()
	desc: string

	@IsString()
	@IsOptional()
	cover_image_url: string

	@IsString()
	@IsOptional()
	content: string

	@IsNumber()
	@IsIn([0, 1])
	state: number
}

export class UpdateArticleDto {
	@IsString()
	title: string

	@IsString()
	@IsOptional()
	desc: string

	@IsString()
	@IsOptional()
	cover_image_url: string

	@IsString()
	@IsOptional()
	content: string

	@IsNumber()
	@IsIn([0, 1])
	state: number
}
