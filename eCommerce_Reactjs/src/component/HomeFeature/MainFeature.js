import React from 'react';
function MainFeature(props) {
  return (
      <section className="feature-area section_gap_bottom_custom">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-money"></i>
                  <h3>Buy more, save more</h3>
                </div>
                <p>Discounts up to 50% off</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-truck"></i>
                  <h3>Free shipping</h3>
                </div>
                <p>Within a 5km radius</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-support"></i>
                  <h3>Ready to assist</h3>
                </div>
                <p>Just contact us</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-feature">
                <div className="title">
                  <i className="flaticon-blockchain"></i>
                  <h3>Secure payment</h3>
                </div>
                <p>Trusted payment gateways</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default MainFeature;