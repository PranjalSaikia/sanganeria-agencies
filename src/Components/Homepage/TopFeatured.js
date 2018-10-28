import React, { Component } from 'react'
import WidgetCard from './WidgetCard';

class TopFeatured extends Component {
  render() {
    return (
      <div style={{marginRight: '39px'}}>
            <div className="row">
            <div className="col-md-4">
                    <WidgetCard 
                        icon="database"
                        title="Bills"
                        value="00"
                    />
            </div>

                <div className="col-md-4">
                    <WidgetCard
                        icon="inr"
                        title="Revenue"
                        value="00.00"
                    />
            </div>

                <div className="col-md-4">
                    <WidgetCard
                        icon="group"
                        title="Customers"
                        value="00"
                    />
            </div>

    
            </div>
      </div>
    )
  }
}

export default TopFeatured;
