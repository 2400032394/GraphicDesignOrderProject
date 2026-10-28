package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.entity.GraphicDesignOrder;

public interface GraphicDesignOrderService
{
    GraphicDesignOrder addGraphicDesignOrder(GraphicDesignOrder order);

    List<GraphicDesignOrder> displayAllGraphicDesignOrders();

    GraphicDesignOrder displayGraphicDesignOrderById(Long id);

    GraphicDesignOrder updateGraphicDesignOrder(GraphicDesignOrder order);

    String deleteGraphicDesignOrderById(Long id);
}