package com.example.ithubmenu.service;

import com.example.ithubmenu.entity.Dish;
import com.example.ithubmenu.model.DishDto;
import com.example.ithubmenu.repository.DishRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishService {

    private final DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public List<DishDto> getAllDishes() {
        return dishRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public DishDto getDishById(Long id) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dish not found with id: " + id));
        return toDto(dish);
    }

    public DishDto saveDish(DishDto dto) {
        Dish dishToSave = toEntity(dto);
        Dish saved = dishRepository.save(dishToSave);
        return toDto(saved);
    }

    public void deleteDish(Long id) {
        if (!dishRepository.existsById(id)) {
            throw new RuntimeException("Dish not found with id: " + id);
        }
        dishRepository.deleteById(id);
    }

    private DishDto toDto(Dish dish) {
        DishDto dto = new DishDto();
        dto.setId(dish.getId());
        dto.setName(dish.getName());
        dto.setPrice(dish.getPrice());
        dto.setDescription(dish.getDescription());
        dto.setImageUrl(dish.getImageUrl());
        return dto;
    }

    private Dish toEntity(DishDto dto) {
        Dish dish = new Dish();
        dish.setId(dto.getId());
        dish.setName(dto.getName());
        dish.setPrice(dto.getPrice());
        dish.setDescription(dto.getDescription());
        dish.setImageUrl(dto.getImageUrl());
        return dish;
    }
}
