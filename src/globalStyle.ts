import { createGlobalStyle } from 'styled-components';
import { BORDER_RADIUS, COLORS } from './utils/config';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    color:  black;
    font-family: 'Poppins', sans-serif;
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: 500;
  }


  input {
    border: 1px solid #ced4da;
     height: 40px;
     min-width: 200px;
     padding: 0 10px;
     border-radius: ${BORDER_RADIUS};

     &:focus {
      border: 1px solid #ced4da;
      box-shadow: none;
      outline: 0;
     }
  }

  .rbc-calendar {
    padding: 20px;
    border: 1px solid rgba(0,0,0,0.1);
    margin-top: 30px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  .rbc-event-content {
    text-align: center;
  }

  .rbc-event {
    background: ${COLORS.default};
    border-radius: 0;

    &.rbc-selected {
      background: ${COLORS.default};

    }
  }

  .rbc-date-cell {
    text-align: left;
    padding: 5px 10px;
    font-size: 14px;
    color: grey;
  }

  .rbc-month-header {
    height: 40px;
    background: #eaf6ff;
    .rbc-header {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .st0{fill:#6BEA65;stroke:#000000;stroke-miterlimit:10;}
	.st1{fill:none;stroke:#000000;stroke-width:0.6;stroke-linecap:round;stroke-linejoin:round;}
	.st2{fill:#6BEA65;stroke:#000000;stroke-width:0.5;stroke-miterlimit:10;}
	.st3{fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}

	.st-20{fill:none;stroke:#00FF00;stroke-width:0.72;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st-21{fill:#6BEA65;stroke:#000000;stroke-miterlimit:10;}
	.st-22{fill:none;stroke:#000000;stroke-width:0.6;stroke-linecap:round;stroke-linejoin:round;}
	.st-23{fill:#6BEA65;stroke:#000000;stroke-width:0.5;stroke-miterlimit:10;}
	.st-24{fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
 `;
