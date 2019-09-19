interface Receipt {
  id: null
  /**
   * The merchant from who this receipt originated (externalId, merchant)
   * must always be unique. It can be nullable, as (on creation and update) integrators will *always*
   * have the ID of the merchant they are operating on sent up as part of the HTTP headers
   */
  merchant: 'DEFAULT_MERCHANT';
  /**
   * Which store the receipt originated from. We expect this to be merchant provided store ID and must exist in your store setup.
   */
  store_id: 'DEFAULT_STORE';
  /**
   * ID of the pos device (terminal or software) (eg. pos-123).
   */
  pos_id: (string|null);
  /**
   * The terminal this transaction originated from within a store. This ID must exist in your store setup.
   */
  tid: 'DEFAULT_TID';
  /**
   * API Client provided ID for the given receipt. (externalId, merchant) must
   * always be unique
   */
  external_id: string;
  /**
   * Receipts sometimes replace existing entries in the system (for example, in the
   * case of refunds)
   */
  replacement_for: null;
  /**
   * If this receipt was replaced, link to the new version
   */
  replaced_by: null;
  /**
   * Basket items.
   */
  basket_items: BasketItem[];
  /**
   * Raw basket items. This field is for create/update requests only (never returned)
   */
  raw_basket_items: '';
  /**
   * Information on the actual payment, this is what we expect will be most useful
   * when attempting to reconcile a receipt to a particular consumer
   */
  payment_data: PaymentInfo[];
  /**
   * The raw representation of the payment data. We want to store this, as we
   * aren't sure how well this will be parsed into the above structure by
   * integrators
   */
  raw_payment_data: '';
  /**
   * Information for cash and other non-card type payments.
   */
  other_payments: OtherPayment[];
  /**
   * Purchaser details if supplied at checkout or linked to a specific tranaction by the POS
   */
  purchaser: null;
  /**
   * Capture any usage of points/points awarded for a given loyalty card.
   */
  loyalty_card_transactions: [];
  /**
   * Exactly when this receipt was issued
   */
  issued_at: number;
  /**
   * Can this receipt be treated as a tax invoice?
   */
  is_tax_invoice: boolean;
  /**
   * The total tax, as sent to us from the issuer. We can't derive this simply from
   * the basket data, as the basket data. This is *exactly* what was billed to the associated card
   */
  total_tax: number;
  /**
   * The total amount paid, as sent to us from the issuer. We can't derive this
   * simply from the basket data, as the basket data may be wrong
   */
  total_price: number;
  /**
   * The currency used for payment.
   */
  currency_code: 'AUD';
  /**
   * If provided, the barcode for the entire receipt
   */
  barcode: (Barcode|null);
  /**
   * Arbitrary metadata provided by the integrator
   */
  metadata: null;
  offers: {kind : "default_campaign"};
  feedback: {kind : "default_survey"};
  receipt_type: 0;
  /**
   * Who served the customer today. eg "Jessica"
   */
  served_by: null;
  /**
   * Is this a test receipt.
   */
  is_test: false;
  /**
   * Return period for all basket items associated with this receipt
   */
  return_period: (number|null);
  tags: string[];
}

export default Receipt;
  
export function makeReceipt(
  input: {
    pos_id?: (string|null),
    external_id?: string,
    basket_items?: BasketItem[],
    payment_data?: PaymentInfo[],
    other_payments?: OtherPayment[],
    issued_at?: number,
    total_tax?: number,
    total_price?: number,
    barcode?: (Barcode|null),
    return_period?: (number|null),
    tags?: string[],
  }
): Receipt {
  return {
    id: null,
    merchant: 'DEFAULT_MERCHANT',
    store_id: 'DEFAULT_STORE',
    pos_id: input.pos_id === undefined ? null : input.pos_id,
    tid: 'DEFAULT_TID',
    external_id: input.external_id === undefined ? "" : input.external_id,
    replacement_for: null,
    replaced_by: null,
    basket_items: input.basket_items === undefined ? [] : input.basket_items,
    raw_basket_items: '',
    payment_data: input.payment_data === undefined ? [] : input.payment_data,
    raw_payment_data: '',
    other_payments: input.other_payments === undefined ? [] : input.other_payments,
    purchaser: null,
    loyalty_card_transactions: [],
    issued_at: input.issued_at === undefined ? 0 : input.issued_at,
    is_tax_invoice: true,
    total_tax: input.total_tax === undefined ? 0 : input.total_tax,
    total_price: input.total_price === undefined ? 0 : input.total_price,
    currency_code: 'AUD',
    barcode: input.barcode === undefined ? null : input.barcode,
    metadata: null,
    offers: { kind : "default_campaign" },
    feedback: { kind : "default_survey" },
    receipt_type: 0,
    served_by: null,
    is_test: false,
    return_period: input.return_period === undefined ? null : input.return_period,
    tags: input.tags === undefined ? [] : input.tags,
  };
}

export interface Barcode {
  id: string;
  format: 8; // code128
}
  
export function makeBarcode(
  input: {
    id?: string
  }
): Barcode {
  return {
    id: input.id === undefined ? '' : input.id,
    format: 8,
  };
}

export type BasketItem = BasketItem_Product;
export interface BasketItem_Product {
  kind: 'product';
  value: BasketProduct;
}

export interface BasketProduct {
  /**
   * The order in which we render a list of basket items. Slightly leaky abstraction, as it's only used at the API layer to
   * re-order basket items, if it's provided on all basket items (we don't really care about it by the time we save the model
   * down)
   */
  seqno: (number|null);
  /**
   * The code or ID of this item. An example is an SKU or ISBN, etc.
   */
  external_id: (string|null);
  /**
   * A short title for this line item
   */
  name: string;
  /**
   * An optional description
   */
  short_description: (string|null);
  /**
   * An optional longer description
   */
  description: (string|null);
  /**
   * Optional list of product attributes.
   */
  attributes: [];
  brand: (string|null);
  identifiers: [];
  tags: string[];
  pricing: Pricing;
  quantity_purchased: number;
  /**
   * Period is in months
   */
  warranty_period: number;
  serial_number: (string|null);
  barcode: (Barcode|null);
  image_url: (string|null);
  external_links: ProductLink[];
  categories: string[];
  original_invoice_number: (string|null);
}

export function makeBasketProduct(
  input: {
    seqno?: (number|null),
    external_id?: (string|null),
    name?: string,
    short_description?: (string|null),
    description?: (string|null),
    brand?: (string|null),
    tags?: string[],
    pricing?: Pricing,
    quantity_purchased?: number,
    warranty_period?: number,
    serial_number?: (string|null),
    barcode?: (Barcode|null),
    image_url?: (string|null),
    external_links?: ProductLink[],
    categories?: string[],
    original_invoice_number?: (string|null),
  }
): BasketProduct {
  return {
    seqno: input.seqno === undefined ? null : input.seqno,
    external_id: input.external_id === undefined ? null : input.external_id,
    name: input.name === undefined ? '' : input.name,
    short_description: input.short_description === undefined ? null : input.short_description,
    description: input.description === undefined ? null : input.description,
    attributes: [],
    brand: input.brand === undefined ? null : input.brand,
    identifiers: [],
    tags: input.tags === undefined ? [] : input.tags,
    pricing: makePricing({}),
    quantity_purchased: input.quantity_purchased === undefined ? 1 : input.quantity_purchased,
    warranty_period: input.warranty_period === undefined ? 0 : input.warranty_period,
    serial_number: input.serial_number === undefined ? null : input.serial_number,
    barcode: input.barcode === undefined ? null : input.barcode,
    image_url: input.image_url === undefined ? null : input.image_url,
    external_links: input.external_links === undefined ? [] : input.external_links,
    categories: input.categories === undefined ? [] : input.categories,
    original_invoice_number: input.original_invoice_number === undefined ? null : input.original_invoice_number,
  };
}

type ProductLink = ProductLink_Product; 

export interface ProductLink_Product {
  kind: 'product';
  value: string;
}

/**
 * Pricing information
 */
export interface Pricing {
  /**
   * Total price, including taxes and discounts
   */
  price: number;
  /**
   * tax (if any) paid
   */
  tax: number;
  /**
   * Absolute discount applied
   */
  discount: number;
  /**
   * An optional tax code (eg. GST) - used for rendering/informational purposes.
   * We'll have a default type for unspecified tax
   */
  tax_type: string;
  /**
   * Currency this line item is denominated in
   */
  currency_code: 'AUD';
}

export function makePricing(
  input: {
    price?: number,
    tax?: number,
    discount?: number,
    tax_type?: string,
  }
): Pricing {
  return {
    price: input.price === undefined ? 0 : input.price,
    tax: input.tax === undefined ? 0 : input.tax,
    discount: input.discount === undefined ? 0 : input.discount,
    tax_type: input.tax_type === undefined ? 'GST' : input.tax_type,
    currency_code: 'AUD',
  };
}

/**
 * All the information we could possibly get associated with a given card payment
 * We don't yet know how much of this information will be available, so have taken
 * the approach in the pilot to capture it all
 */
export interface PaymentInfo {
  /**
   * The Card itself, with the PAN masked
   */
  card: MaskedCard;
  /**
   * The merchant ID as sent to the issuer by the acquirer/card network
   */
  network_merchant_id: '';
  /**
   * This is the merchant who is accepting the payment
   */
  card_acceptor_name: null;
  /**
   * The id provided by the terminal. eg "34645364"
   */
  tid: null;
  /**
   * The Retrieval Reference Number for the payment
   */
  rrn: (string|null);
  /**
   * The System Trace Audit Number for the payment
   */
  stan: (string|null);
  /**
   * The authorisation code for the payment
   */
  auth_code: null;
  /**
   * The transaction date, stored in exactly the same format it was supplied to us by the integrator
   * this may aid matching
   */
  transaction_date: string;
  /**
   * Exactly how much was billed to this particular card
   * purchase amount and total are returned in all EFT transaction.
   * Unsure where they are not the same. To determine if both required in future.
   */
  purchase_amount: 0;
  total: number;
  /**
   * What currency was this payment made in. For example, Receipt line items may be
   * in USD, however, the payment itself was in AUD.
   */
  currency_code: 'AUD';
  /**
   * Merchant store address
   */
  address: null;
  merchant_category_code: null;
  /**
   * The acquirer name or label. eg "CBA"
   */
  acquirer: null;
  /**
   * The brand name for the terminal. eg "COMMONWEALTH BANK EFTPOS"
   */
  terminal_name: null;
  /**
   * The type of purchase. eg "credit or debit"
   */
  purchase_type: null;
  /**
   * The type of transaction. eg "purchase"
   */
  transaction_type: null;
  /**
   * The POS generated transaction reference number. eg "134771".
   */
  pos_ref_no: null;
  /**
   * The POS generated transaction reference number.
   * This may be the same as pos_ref_no
   */
  transaction_reference_number: null;
  reference_id: null;
}

export function makePaymentInfo(
  input: {
    card?: MaskedCard,
    rrn?: (string|null),
    stan?: (string|null),
    transaction_date?: string,
    total?: number,
  }
): PaymentInfo {
  return {
    card: input.card === undefined ? makeMaskedCard({}) : input.card,
    network_merchant_id: '',
    card_acceptor_name: null,
    tid: null,
    rrn: input.rrn === undefined ? null : input.rrn,
    stan: input.stan === undefined ? null : input.stan,
    auth_code: null,
    transaction_date: input.transaction_date === undefined ? '' : input.transaction_date,
    purchase_amount: 0,
    total: input.total === undefined ? 0 : input.total,
    currency_code: 'AUD',
    address: null,
    merchant_category_code: null,
    acquirer: null,
    terminal_name: null,
    purchase_type: null,
    transaction_type: null,
    pos_ref_no: null,
    transaction_reference_number: null,
    reference_id: null,
  };
}

/**
 * A credit card, with the PAN masked. Used as part of the payment structure, as
 * well as being attached to consumers
 */
export interface MaskedCard {
  /**
   * The masked PAN for the card (includes the first 6 and last 4 digits, with the
   * middle digits masked with an 'X'
   * TODO(jeeva,timd): We don't always get this information normalised, so we need to
   * normalise it when we store it down (Replace missing digits with 'X')
   */
  pan: Pan;
  /**
   * Optional card id (provided by the bank)
   */
  external_id: (string|null);
  /**
   * The name on the card, may not always line up to the name of the consumer's
   * account
   */
  name: (string|null);
  /**
   * Expiry date of the card, Provided in MMYY format
   */
  expiry: (string|null);
  card_type: (string|null);
}

export function makeMaskedCard(
  input: {
    pan?: Pan,
    external_id?: (string|null),
    name?: (string|null),
    expiry?: (string|null),
    card_type?: (string|null),
  }
): MaskedCard {
  return {
    pan: input.pan === undefined ? { kind: 'mpan', value: '' } : input.pan,
    external_id: input.external_id === undefined ? null : input.external_id,
    name: input.name === undefined ? null : input.name,
    expiry: input.expiry === undefined ? null : input.expiry,
    card_type: input.card_type === undefined ? null : input.card_type,
  };
}

export interface Pan {
  kind: 'mpan';
  value: string;
}

/**
 * structure for non card payments
 */
export interface OtherPayment {
  payment_type: 0; // cash
  reference: (string|null);
  amount: number;
}

export function makeOtherPayment(
  input: {
    reference?: (string|null),
    amount?: number,
  }
): OtherPayment {
  return {
    payment_type: 0,
    reference: input.reference === undefined ? null : input.reference,
    amount: input.amount === undefined ? 0 : input.amount,
  };
}
