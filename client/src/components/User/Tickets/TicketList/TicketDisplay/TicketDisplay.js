/* eslint-disable no-underscore-dangle */
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import { toast } from 'react-toastify';

// Component imports
import TicketDisplayButtons from './Buttons/TicketDisplayButtons.js';
import TicketForm from '../../TicketForm.js';

// Asset imports
import '../../../../../assets/css/ticket.css';

// Action imports
import {
  ticketsOneSelected,
  ticketUpdate,
  ticketDelete
} from '../../../../../redux/actions/tickets.js';
import Loading from '../../../../../assets/js/loading.js';
import Image from '../../../../Image/Image.js';

// Start Component
class TicketDisplay extends Component {
  INIT = {
    btnDelete: 'delete',
    btnUpdate: 'update',
    display: 'd-none'
  };

  constructor(props) {
    super(props);
    this.state = this.INIT;
  }

  static propTypes = {
    count: PropTypes.number,
    selectedTicket: PropTypes.object,
    ticket: PropTypes.object,
    ticketDelete: PropTypes.func,
    ticketUpdate: PropTypes.func,
    user: PropTypes.object,
    users: PropTypes.array
  };

  ticketSubmit = (id, ticketData) => {
    this.setState({ btnUpdate: <Loading /> });

    return this.props
      .ticketUpdate(id, ticketData)
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => {
        this.setState(this.INIT);
        $('.modal-backdrop').remove();
      });
  };

  ticketDelete = (id) => {
    this.setState({ btnDelete: <Loading /> });

    return this.props
      .ticketDelete(id)
      .then((response) => toast.success(
        (response && response.value && response.value.data && response.value.data.message)
            || (response && response.statusText)
            || 'Success'
      ))
      .catch((err) => toast.error(
        (err && err.response && err.response.data && err.response.data.message)
            || (err
              && err.response
              && err.response.data
              && err.response.data.message
              && err.response.data.message.name)
            || (err && err.response && err.response.statusText)
            || 'Network error'
      ))
      .finally(() => {
        this.setState(this.INIT);
        $('.modal-backdrop').remove();
      });
  };

  render = () => {
    const { btnDelete, btnUpdate, display } = this.state;
    const {
      ticket, user, selectedTicket, users
    } = this.props;
    const _id = selectedTicket && selectedTicket._id;
    const title = ticket && ticket.title;
    const status = ticket && ticket.status;
    const type = ticket && ticket.type;
    const createdAt = ticket && ticket.createdAt;
    const description = ticket && ticket.description;
    const image = ticket && ticket.image;
    const problemUser = ticket && ticket.user;
    const shop = ticket && ticket.shop;
    const orderNumber = ticket && ticket.orderNumber;
    const owner = ticket && ticket.owner;
    const { name, email } = owner;
    const usersImage = users.filter((i) => i.email === email)[0].image;
    const d = new Date(createdAt);
    const date = d.toDateString();

    return (
      <>
        <div className="">
          <div className="d-block d-lg-flex align-items-center ticket-row">
            <div className="cell header">
              <div id="ticketID">
                <span className="text-truncate">#{this.props.count + 1}</span>
              </div>
              <div className="ticket-actions ticket-actions-small">
                <TicketDisplayButtons
                  expand={() => this.setState({ display: display === 'd-none' ? 'd-flex' : 'd-none' })}
                  ticket={ticket}
                  user={user}
                />
              </div>
            </div>
            <div className="cell title">
              <span className="text-truncate">{title}</span>
            </div>
            <div className="cell status">
              <span className="rounded-pill bg-success text-white px-3 py-1 mr-2">{type}</span>
              <span className="rounded-pill bg-success text-white px-3 py-1">{status}</span>
            </div>
            <div className="cell createdAt">{date}</div>
            <div className="cell d-none ticket-actions d-lg-flex">
              <TicketDisplayButtons
                expand={() => this.setState({ display: display === 'd-none' ? 'd-flex' : 'd-none' })}
                ticket={ticket}
                user={user}
              />
            </div>
          </div>
          <div className={`misc ${display}`}>
            <div className="img-holder">
              <Image image={usersImage} />
            </div>
            <div className="info">
              <p className="name">{name}</p>
              <p className="response">{description}</p>
              <p>{[problemUser, shop, orderNumber].filter((i) => i !== 'undefined')[0]}</p>
              <Image image={image} />
            </div>
          </div>
          <div className="responses"></div>
        </div>

        <div
          className="modal fade"
          id="ticketDeleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ticketDeleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Ticket</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Are you sure you want to delete ticket {_id}?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-capitalize"
                  onClick={() => this.ticketDelete(_id)}
                >
                  {btnDelete}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="ticketEditModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ticketModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" id="formContainer">
              <div className="modal-body form-container-holder">
                <TicketForm
                  buttonValue={btnUpdate}
                  onSubmit={(ticketData) => this.ticketSubmit(_id, ticketData)}
                  user={user}
                />{' '}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}
// End Component

const mapStateToProps = ({ user, ticket }) => ({
  user: user.selected,
  users: user.all,
  selectedTicket: ticket.selected
});

export default connect(mapStateToProps, { ticketsOneSelected, ticketDelete, ticketUpdate })(
  TicketDisplay
);
