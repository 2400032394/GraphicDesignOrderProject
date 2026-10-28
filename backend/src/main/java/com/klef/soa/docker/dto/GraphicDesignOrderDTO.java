package com.klef.soa.docker.dto;

public class GraphicDesignOrderDTO
{
    private Long id;
    private String clientName;
    private String designType;
    private Double price;
    private Boolean approved;

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getClientName()
    {
        return clientName;
    }

    public void setClientName(String clientName)
    {
        this.clientName = clientName;
    }

    public String getDesignType()
    {
        return designType;
    }

    public void setDesignType(String designType)
    {
        this.designType = designType;
    }

    public Double getPrice()
    {
        return price;
    }

    public void setPrice(Double price)
    {
        this.price = price;
    }

    public Boolean getApproved()
    {
        return approved;
    }

    public void setApproved(Boolean approved)
    {
        this.approved = approved;
    }
}