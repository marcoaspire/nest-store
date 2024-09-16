import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {


    @ApiProperty({ 
        description: 'Product title',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;
    
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    slug?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsPositive()
    @IsInt()
    stock?: number;

    @ApiProperty()
    @IsString({each:true})
    @IsArray()
    sizes: string [];
    
    @ApiProperty()
    @IsIn(['man', 'woman', 'kid', 'unisex'])
    gender: string;

    @ApiProperty()
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    tags: string [];
    
    @ApiProperty()
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    images?: string[];
}
