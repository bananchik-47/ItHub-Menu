package com.example.ItHub_Menu.model;

import lombok.Data;

@Data
public class DishDto {

    private Long id;

    private String name;

    private Integer price;

    private String description;

    private String imageUrl;
}
