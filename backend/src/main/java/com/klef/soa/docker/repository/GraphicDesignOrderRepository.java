package com.klef.soa.docker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.soa.docker.entity.GraphicDesignOrder;

@Repository
public interface GraphicDesignOrderRepository extends JpaRepository<GraphicDesignOrder, Long>
{

}