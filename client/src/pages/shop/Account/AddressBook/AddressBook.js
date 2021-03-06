import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { T, I18n } from '@deity/falcon-i18n';
import { H1, H2, Box, Link, Icon, Button, Divider, FlexLayout } from '@deity/falcon-ui';
import { getAddressType, AddressCardLayout, AddressListLayout, AddressDetails } from '@deity/falcon-ui-kit';
import { RemoveAddressMutation, AddressListQuery } from '@deity/falcon-shop-data';

const AddressBook = () => (
  <Box>
    <H1>
      <T id="addressBook.title" />
    </H1>
    <AddressListQuery>
      {({ data: { addressList } }) => {
        const billing = addressList.items.find(x => x.defaultBilling);
        const shipping = addressList.items.find(x => x.defaultShipping);
        const rest = addressList.items.filter(x => !x.defaultBilling && !x.defaultShipping) || [];
        const anyDefaults = billing || shipping;
        const defaultsEqual = (billing && billing.id) === (shipping && shipping.id);
        const anyRest = rest.length > 0;

        return (
          <>
            {anyDefaults && (
              <AddressListLayout my="md">
                {defaultsEqual ? (
                  <DefaultAddressCard address={billing} />
                ) : (
                  <>
                    {billing && <DefaultAddressCard address={billing} />}
                    {shipping && <DefaultAddressCard address={shipping} />}
                  </>
                )}
              </AddressListLayout>
            )}
            {anyDefaults && anyRest && <Divider />}
            {anyRest && (
              <Box my="md">
                <H2>
                  <T id="addressBook.sectionTitle_other" />
                </H2>
                <AddressListLayout gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}>
                  {rest.map(({ id, ...addressRest }) => (
                    <AddressCardLayout key={id}>
                      <AddressDetails {...addressRest} />
                      <AddressActions addressId={id} />
                    </AddressCardLayout>
                  ))}
                </AddressListLayout>
              </Box>
            )}
            <FlexLayout flexDirection="column" alignItems="center" p="sm">
              <Button as={RouterLink} to="/account/address-book/add" flex={1}>
                <T id="addressBook.addNewButton" />
              </Button>
            </FlexLayout>
          </>
        );
      }}
    </AddressListQuery>
  </Box>
);

export default AddressBook;

const DefaultAddressCard = ({ address }) => (
  <AddressCardLayout>
    <H2>
      <T id="addressBook.sectionTitle" context={getAddressType(address)} />
    </H2>
    <AddressDetails {...address} />
    <AddressActions addressId={address.id} />
  </AddressCardLayout>
);

const AddressActions = ({ addressId }) => (
  <FlexLayout flexDirection="row" mt="xs">
    <EditAddressLink id={addressId} />
    <Divider variant="horizontal" mx="xs" />
    <RemoveAddressLink id={addressId} />
  </FlexLayout>
);

const EditAddressLink = ({ id }) => (
  <Link as={RouterLink} to={`/account/address-book/edit/${id}`}>
    <T id="addressBook.editButton" />
  </Link>
);

const RemoveAddressLink = ({ id }) => (
  <RemoveAddressMutation>
    {(removeAddress, { loading }) => (
      <I18n>
        {t => (
          <>
            <Link
              onClick={() => {
                if (window.confirm(t('addressBook.removeConfirmationMessage'))) {
                  removeAddress({ variables: { id } });
                }
              }}
            >
              {t('addressBook.removeButton')}
            </Link>
            {loading && <Icon ml="xs" src="loader" size="md" />}
          </>
        )}
      </I18n>
    )}
  </RemoveAddressMutation>
);
