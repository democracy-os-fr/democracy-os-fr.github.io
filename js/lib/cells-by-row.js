/*!
 * cellsByRows layout mode for Isotope
 * v1.1.2
 * http://isotope.metafizzy.co/layout-modes/cellsbyrow.html
 */

/*jshint browser: true, devel: false, strict: true, undef: true, unused: true */

( function( window ) {

'use strict';

function cellsByRowDefinition( LayoutMode ) {

  var CellsByRow = LayoutMode.create( 'cellsByRow' );

  CellsByRow.prototype._resetLayout = function() {
    // reset properties
    this.itemIndex = 0;
    // measurements
    this.getColumnWidth();
    this.getRowHeight();
    // set cols
    this.cols = Math.floor( this.isotope.size.innerWidth / this.columnWidth );
    this.cols = Math.max( this.cols, 1 );
  };

  CellsByRow.prototype._getItemLayoutPosition = function( item ) {
    item.getSize();
    var col = this.itemIndex % this.cols;
    var row = Math.floor( this.itemIndex / this.cols );
    // center item within cell
    var x = ( col + 0.5 ) * this.columnWidth - item.size.outerWidth / 2;
    var y = ( row + 0.5 ) * this.rowHeight - item.size.outerHeight / 2;
    this.itemIndex++;
    return { x: x, y: y };
  };

  CellsByRow.prototype._getContainerSize = function() {
    return {
      height: Math.ceil( this.itemIndex / this.cols ) * this.rowHeight
    };
  };

  return CellsByRow;

}

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'isotope/js/layout-mode'
    ],
    cellsByRowDefinition );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = cellsByRowDefinition(
    require('isotope-layout/js/layout-mode')
  );
} else {
  // browser global
  cellsByRowDefinition(
    window.Isotope.LayoutMode
  );
}

})( window );
