package com.example.ItHub_Menu.service;

import com.example.ItHub_Menu.entity.Dish;
import com.example.ItHub_Menu.model.DishDto;
import com.example.ItHub_Menu.repository.DishRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DishService {

    private final DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public List<DishDto> getAllDishes() {
        return dishRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DishDto getDishById(Long id) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));
        return convertToDto(dish);
    }

    public DishDto saveDish(DishDto dto) {
        Dish dish = convertToEntity(dto);
        Dish savedDish = dishRepository.save(dish);
        return convertToDto(savedDish);
    }

    public void deleteDish(Long id) {
        if (!dishRepository.existsById(id)) {
            throw new RuntimeException("Dish not found with id: " + id);
        }
        dishRepository.deleteById(id);
    }

    private DishDto convertToDto(Dish dish) {
        DishDto dto = new DishDto();
        dto.setId(dish.getId());
        dto.setName(dish.getName());
        dto.setPrice(dish.getPrice());
        dto.setDescription(dish.getDescription());
        dto.setImageUrl(dish.getImageUrl());
        return dto;
    }

    private Dish convertToEntity(DishDto dto) {
        Dish dish = new Dish();
        dish.setId(dto.getId());
        dish.setName(dto.getName());
        dish.setPrice(dto.getPrice());
        dish.setDescription(dto.getDescription());
        dish.setImageUrl(dto.getImageUrl());
        return dish;
    }
}
