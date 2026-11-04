# Cart page and discount rules test plan

## Application Overview

Plan for the Orion Shop cart page at http://localhost:3000/cart. Each scenario starts from a fresh page with the default Rs 1,000 cart and no applied code. The discount rule is SAVE10: 10% off, capped at Rs 200, eligible at cart values of Rs 500 or more, and expired after 2026-12-31 23:59 (+05:30). The expected results below describe the intended behavior. The current app defaults enable seeded min-cart and lowercase bugs, so the exact Rs 500 and lowercase-code scenarios may expose failures until those bugs are disabled/fixed.

## Test Scenarios

### 1. Cart discount rules

**Seed:** `tests/cart.spec.ts`

#### 1.1. Shows the cart baseline

**File:** `specs/cart/baseline.spec.ts`

**Steps:**
  1. Open http://localhost:3000/cart in a fresh page.
    - expect: The Your cart heading, Cart value (Rs), Discount code, Apply code, Total to pay, and Pay now controls are visible.
  2. Do not apply a discount code; inspect the default values.
    - expect: Cart value is Rs 1,000 and Total to pay is Rs 1,000.

#### 1.2. Applies 10 percent discount to an eligible cart

**File:** `specs/cart/discount-rate.spec.ts`

**Steps:**
  1. Open http://localhost:3000/cart and set Cart value (Rs) to 1,000.
    - expect: The total before applying a code is Rs 1,000.
  2. Enter SAVE10 and click Apply code.
    - expect: A success message reports Rs 100 off.
    - expect: Total to pay is Rs 900.

#### 1.3. Accepts the minimum eligible cart value

**File:** `specs/cart/minimum-boundary.spec.ts`

**Steps:**
  1. Open http://localhost:3000/cart and set Cart value (Rs) to exactly 500.
    - expect: The cart value is Rs 500.
  2. Enter SAVE10 and click Apply code.
    - expect: The code is accepted at the inclusive Rs 500 minimum.
    - expect: A success message reports Rs 50 off and Total to pay is Rs 450.

#### 1.4. Rejects a cart just below the minimum

**File:** `specs/cart/below-minimum.spec.ts`

**Steps:**
  1. Open http://localhost:3000/cart and set Cart value (Rs) to 499.
    - expect: The cart value is Rs 499.
  2. Enter SAVE10 and click Apply code.
    - expect: An eligibility message says the cart must be Rs 500 or more.
    - expect: The code is not applied and Total to pay remains Rs 499.

#### 1.5. Caps the discount at Rs 200

**File:** `specs/cart/discount-cap.spec.ts`

**Steps:**
  1. Open http://localhost:3000/cart and set Cart value (Rs) to 3,000.
    - expect: The cart value is Rs 3,000.
  2. Enter SAVE10 and click Apply code.
    - expect: The discount is capped at Rs 200 rather than Rs 300.
    - expect: Total to pay is Rs 2,800.

#### 1.6. Rejects an unrecognized discount code

**File:** `specs/cart/invalid-code.spec.ts`

**Steps:**
  1. Open http://localhost:3000/cart and leave the cart value at Rs 1,000.
    - expect: The total before applying a code is Rs 1,000.
  2. Enter NOTACODE and click Apply code.
    - expect: An invalid-code message is displayed.
    - expect: Total to pay remains Rs 1,000.

#### 1.7. Normalizes code case and surrounding whitespace

**File:** `specs/cart/code-normalization.spec.ts`

**Steps:**
  1. Open http://localhost:3000/cart and set the code field to `  save10  `.
    - expect: The code field contains the entered lowercase code with surrounding whitespace.
  2. Click Apply code.
    - expect: The trimmed, case-insensitive code is accepted.
    - expect: A success message reports Rs 100 off and Total to pay is Rs 900.

#### 1.8. Rejects the code after its expiry date

**File:** `specs/cart/expired-code.spec.ts`

**Steps:**
  1. Start the shop with SHOP_TODAY set to 2027-01-01, then open http://localhost:3000/cart.
    - expect: The fresh cart total is Rs 1,000.
  2. Enter SAVE10 and click Apply code.
    - expect: An expired-code message is displayed.
    - expect: The code is not applied and Total to pay remains Rs 1,000.

#### 1.9. Clears the applied discount when cart value changes

**File:** `specs/cart/cart-change.spec.ts`

**Steps:**
  1. Open http://localhost:3000/cart, apply SAVE10 to the default Rs 1,000 cart, and verify the total is Rs 900.
    - expect: The code is accepted and Total to pay is Rs 900.
  2. Change Cart value (Rs) to 1,500.
    - expect: The success message is cleared.
    - expect: Total to pay returns to the undiscounted cart value of Rs 1,500.
